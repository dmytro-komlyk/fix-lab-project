import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

describe('BrandsController', () => {
  // eslint-disable-next-line
  let service: BrandsService;
  let controller: BrandsController;

  const mockBrand = {
    _id: '64ef4383e46e72721c03090e',
    slug: 'apple',
    isActive: true,
    title: 'Apple',
    article: 'Reparing Apple phones...',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance'
    },
    icon: {
      _id: '64ef4383e46e72721c03090e',
      file: 'buffer......',
      src: '/public/image_path',
      alt: 'Alt image',
      type: 'Type image'
    }
  };

  const mockBrandsService = {
    findAllActiveBrands: jest.fn().mockResolvedValueOnce([mockBrand])
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BrandsController],
      providers: [{ provide: BrandsService, useValue: mockBrandsService }]
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
