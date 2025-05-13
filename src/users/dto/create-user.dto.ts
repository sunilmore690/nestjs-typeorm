import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123!',
  })
  readonly password: string;
}
