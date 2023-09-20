import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MyPropertyService } from 'src/service/my-property/my-property.service';

@Controller('my-property')
export class MyPropertyController {
    constructor(private propertyService: MyPropertyService) {

    }

    @Post("vehicle")
    @UseInterceptors(FilesInterceptor('images'))
    uploadVehicleProperty(@UploadedFiles() images: Array<Express.Multer.File>) {
        // console.log(formBody);
        console.log(images);
    }
}
