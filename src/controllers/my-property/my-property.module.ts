import { Module } from '@nestjs/common';
import { MyPropertyController } from './my-property.controller';
import { Vehicle, VehicleImage } from 'src/entity/my-property/my-property';
import { MyPropertyService } from 'src/service/my-property/my-property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/signup/signup.entity';

@Module({
    controllers: [MyPropertyController],
    providers: [MyPropertyService],
    imports: [TypeOrmModule.forFeature([Vehicle, VehicleImage, User])],
    exports: [TypeOrmModule]
})
export class MyPropertyModule {}
