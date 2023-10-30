/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  AssumerListModel,
  MyJewelryPropertyModel,
  MyVehiclePropertyModel,
  UpdateVehicleInformationModel,
} from 'src/models/my-property/MyProperty';
import {
  JewelryOwnerModel,
  VehicleOwnerModel,
} from 'src/models/user/UserModel';
import { MyPropertyService } from 'src/service/my-property/my-property.service';

@Controller('my-property')
export class MyPropertyController {
  constructor(private propertyService: MyPropertyService) {}

  @Post('vehicle')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: 'public/images/vehicle',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadVehicleProperty(
    @Body() formBody: VehicleOwnerModel,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<ResponseData<[]>> {
    try {
      const pathLists: string[] = [];
      images.map((image) => pathLists.push(image.path));

      return this.propertyService.uploadVehicleProperty(formBody, pathLists);
    } catch (err) {
      const resp: ResponseData<[]> = {
        code: 0,
        status: 500,
        message: 'Someting went wrong.',
        data: [],
      };

      return new Promise((resolve, reject) => resolve(resp));
    }
  }
  @Get('vehicles/:email')
  getActiveUserVehicles(
    @Param('email') email: string,
  ): Promise<ResponseData<MyVehiclePropertyModel[]>> {
    return this.propertyService.getActiveUserProperty(email);
  } // get all vehicles of active user
  @Get('vehicle')
  getAllVehicles() {} // get all vehicles for assumption display
  @Get('certain-vehicle/:vehicleID')
  getCertainVehicle(@Param() param: any) {
    const { vehicleID } = param;
    return this.propertyService.getCertainVehicle(vehicleID);
  } // for update vehicle
  @Post('update-certain-vehicle')
  updateCertainVehicleInfo(
    @Body() vehicleInfo: UpdateVehicleInformationModel,
  ): Promise<ResponseData<string>> {
    return this.propertyService.updateCertainVehicle(vehicleInfo);
  } // for update vehicle
  @Delete('remove-certain-vehicle/:vehicleID')
  removeCertainVehicleProperty(
    @Param() param: { vehicelID: number },
  ): Promise<ResponseData<string>> {
    return this.propertyService.removeCertainVehicle(param);
  }
  @Get('all-property-assumption/:userId')
  getAllMyAssumedProperty(@Param() param: { userId: number }) {
    return this.propertyService.getAllMyAssumedProperty(param);
  }
  @Get('list-assumer/:propertyId')
  listAssumerOfMyProperty(
    @Param('propertyId') propertyId: number,
  ): Promise<ResponseData<AssumerListModel>> {
    return this.propertyService.listAssumerOfMyProperty(propertyId);
  }
  @Patch('remove-assumer/:assumerId')
  removeAssumer(
    @Param('assumerId') assumerId: number,
  ): Promise<ResponseData<string>> {
    return this.propertyService.removeAssumer(assumerId);
  }
  @Post('jewelry')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: 'public/images/jewelry',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadJewelry(
    @Body() formBody: JewelryOwnerModel,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<ResponseData<[]>> {
    try {
      const pathLists: string[] = [];
      images.map((image) => pathLists.push(image.path));
      return this.propertyService.uploadJewelryProperty(formBody, pathLists);
    } catch (error) {
      const resp: ResponseData<[]> = {
        code: 0,
        status: 500,
        message: 'Someting went wrong.',
        data: [],
      };

      return new Promise((resolve, reject) => resolve(resp));
    }
  }
  @Get('jewelry/:email')
  getActiveUserJewelry(
    @Param() param: { email: string },
  ): Promise<ResponseData<MyJewelryPropertyModel[]>> {
    return this.propertyService.getActiveUserJewelry(param);
  }
  @Get('certain-jewelry/:jewelryID')
  getCertainJewelry(
    @Param() param: any,
  ): Promise<ResponseData<MyJewelryPropertyModel>> {
    const { jewelryID } = param;
    return this.propertyService.getCertainJewelry(jewelryID);
  }
}
