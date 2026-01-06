import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UserService }  from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VendorService {
  constructor(private userService:UserService,
              private prisma:PrismaService
  ){}
  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAll() { 
    return this.prisma.user.findMany({
      where : {
        role:'vendor'
      },
      include : {
        vendor : {
          include : {
            vendorDocument: true
          },
        },
      },
      orderBy: {
        createdAt : 'desc'
      }
    });
  }
  getVendorForApproval(){
    return this.prisma.user.findMany({
      where : {
        role:'vendor',
        operationalStatus : 'pending',
        vendor : {
          varified : false,
          vendorDocument : {
            docStatus : 'pending'
          },
        },
      },
      include : {
        vendor : {
          include : {
            vendorDocument: true
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  }

 

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
  //frontend content
  getApprovedVendors(){
      return this.prisma.user.findMany({
      where : {
        role:'vendor',
        accountStatus : 'active',
        operationalStatus : 'active',
        vendor : {
          varified : true,
          vendorDocument : {
            docStatus : 'approved'
          },
        },
      },
      include : {
        vendor : true
        /*vendor : {
          include : {
            vendorDocument: true
          },
        },*/
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  }
  
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where : {id : id}
    });
    
  }

  trendingVendor(){
    return this.prisma.influencerReview.findMany({
      where : { moderationStatus : 'approved'},
      
      include : {
        vendor : {
          include : {
            user : true
          }
        },
        influencer: true
      },
    
    })
  }
}
  /*select : {
        vendorId: true, 
        influencerId: true,
        rating: true,
        mediaUrl:true,
        mediaType:true,
      } */