import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import z from "zod";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "USER"]).default("USER")
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@ApiTags('Accounts')
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @ApiOperation({
    summary: 'Create a new user account'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@email.com' },
        password: { type: 'string', example: '123456' },
        role: {
          type: 'string',
          enum: ['ADMIN', 'USER'],
          example: 'USER'
        }
      },
      required: ['name', 'email', 'password']
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Account successfully created',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe'
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Email already in use'
  })

  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, role, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'Email already in use.'
      )
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role ?? "USER"
      }
    })

    return {
      id: user.id,
      name: user.name,
    };
  }
}