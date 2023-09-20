import { Module } from '@nestjs/common';
import { MyPropertyController } from './my-property.controller';
import { Vehicle } from 'src/entity/my-property/my-property';
import { MyPropertyService } from 'src/service/my-property/my-property.service';

@Module({
    controllers: [MyPropertyController],
    providers: [MyPropertyService],
    imports: [Vehicle]
})
export class MyPropertyModule {}
