import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
});

console.log(env);

const errors = validateSync(env);
console.log(errors);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
