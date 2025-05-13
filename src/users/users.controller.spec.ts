import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    // password intentionally omitted
  };

  const usersArray = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
   let service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return message and data', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);

      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'StrongPassword123!',
      };

      const result = await controller.create(dto);
      expect(result).toEqual({ message: 'User created', data: mockUser });
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw BAD_REQUEST on error', async () => {
      mockUsersService.create.mockRejectedValue(new Error('Email exists'));

      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'StrongPassword123!',
      };

      await expect(controller.create(dto)).rejects.toThrow(HttpException);
      await expect(controller.create(dto)).rejects.toThrow('Email exists');
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUsersService.findAll.mockResolvedValue(usersArray);

      const result = await controller.findAll();
      expect(result).toEqual(usersArray);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });

    it('should throw BAD_REQUEST on error', async () => {
      mockUsersService.findAll.mockRejectedValue(new Error('DB error'));

      await expect(controller.findAll()).rejects.toThrow(HttpException);
      await expect(controller.findAll()).rejects.toThrow('DB error');
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NOT_FOUND if user does not exist', async () => {
      mockUsersService.findOne.mockRejectedValue(
        new Error('User with ID 1 not found'),
      );

      await expect(controller.findOne('1')).rejects.toThrow(HttpException);
      await expect(controller.findOne('1')).rejects.toThrow(
        'User with ID 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a user and return message and data', async () => {
      mockUsersService.update.mockResolvedValue({
        ...mockUser,
        name: 'Updated',
      });

      const dto: UpdateUserDto = { name: 'Updated' };

      const result = await controller.update('1', dto);
      expect(result).toEqual({
        message: 'User 1 updated',
        data: { ...mockUser, name: 'Updated' },
      });
      expect(mockUsersService.update).toHaveBeenCalledWith('1', dto);
    });

    it('should throw BAD_REQUEST on error', async () => {
      mockUsersService.update.mockRejectedValue(new Error('Update failed'));

      const dto: UpdateUserDto = { name: 'Updated' };

      await expect(controller.update('1', dto)).rejects.toThrow(HttpException);
      await expect(controller.update('1', dto)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('remove', () => {
    it('should delete a user and return message', async () => {
      mockUsersService.remove.mockResolvedValue({ deleted: true });

      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'User 1 deleted' });
      expect(mockUsersService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NOT_FOUND on error', async () => {
      mockUsersService.remove.mockRejectedValue(
        new Error('User with ID 1 not found'),
      );

      await expect(controller.remove('1')).rejects.toThrow(HttpException);
      await expect(controller.remove('1')).rejects.toThrow(
        'User with ID 1 not found',
      );
    });
  });
});
