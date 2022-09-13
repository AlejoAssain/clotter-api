import { Module } from '@nestjs/common';

import { DatabaseProvider } from './database.provider';


@Module({
  imports: [DatabaseProvider],
  // share the provider with other modules that exports this module
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
