import { Controller, Get, UseGuards } from '@nestjs/common';
import { MustBeLogged } from 'src/auth/guards/must-be-logged.guard';
import { MustNotBeLogged } from 'src/auth/guards/must-not-be-logged.guard';

@Controller('api')
export class ApiController {
  /**
   * GET for /api/hello is a public resource.
   * It will not be enforced by the LoggedGuard.
   */
  @Get('hello')
  public hello() {
    return {
      message: "Hello World! I'm a public resource.",
    };
  }

  /**
   * GET for /api/world is a protected resource.
   * The business logic is implemented in the LoggedGuard.
   */
  @UseGuards(MustBeLogged)
  @Get('world')
  public world() {
    return {
      message:
        "Hello World! I'm a protected resource, and you're a logged user.",
    };
  }

  /**
   * GET for /api/world is a protected resource.
   * The business logic is implemented in the LoggedGuard.
   */
  @UseGuards(MustNotBeLogged)
  @Get('non-users')
  public mustNotBeLogged() {
    return {
      message:
        "Hello World! I'm a protected resource, and you're a logged user.",
    };
  }
}
