import { Module } from '@nestjs/common';
import { MyPropertyController } from './my-property.controller';
import { Vehicle } from 'src/entity/my-property/my-property';

@Module({
    controllers: [MyPropertyController],
    providers: [],
    imports: [Vehicle]
})
export class MyPropertyModule {}
