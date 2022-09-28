import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { mergeMap, throwIfEmpty, catchError, map } from 'rxjs/operators';
import { RoleType } from '../shared/enum/role-type.enum';
import { USER_MODEL } from '../database/database.constants';
import { User, UserModel } from '../database/user.model';
// import { SendgridService } from '../sendgrid/sendgrid.service';
import { RegisterDto } from './register.dto';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private userModel: UserModel, // private sendgridService: SendgridService
  ) {}

  findAll(): Observable<User[]> {
    return from(this.userModel.find().exec()).pipe(
      map((users) =>
        users.filter((user) => {
          return user.roles.includes(RoleType.USER);
        }),
      ),
    );
  }

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }).exec());
  }

  findByName(username: string): Observable<User[]> {
    return from(
      this.userModel
        .find({
          fullName: { $regex: username, $options: 'i' },
        })
        .exec(),
    );
  }

  existsByUsername(username: string): Observable<boolean> {
    return from(this.userModel.exists({ username }));
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }));
  }

  register(data: RegisterDto): Observable<User> {
    // Simply here we can send a verification email to the new registered user
    // by calling SendGrid directly.
    //
    // In a microservice application, you can send this msg to a message broker
    // then subsribe it in antoher (micro)service and send the emails.

    // Use base64 to genrate a random string
    // const randomCode = btoa(Math.random().toString()).slice(0, 4);
    // console.log(`random code:${randomCode}`);

    // const created = this.userModel.create({
    //   ...data,
    //   verified: false,
    //   verifyCode: randomCode,
    //   roles: [RoleType.USER]
    // });

    //  Sendgrid can manage email templates, use an existing template is more reasonable.
    //
    // const msg = {
    //   to: data.email,
    //   from: 'no-reply@example.com', // Use the email address or domain you verified above
    //   subject: 'Welcome to Nestjs Sample',
    //   text: `verification code:${randomCode}`,
    //   html: `<strong>verification code:${randomCode}</strong>`,
    // };
    // this.sendgridService.send(msg)
    //   .subscribe({
    //     next: data => console.log(`${data}`),
    //     error: error => console.log(`${error}`)
    //   });

    const created = this.userModel.create({
      ...data,
      roles: [RoleType.USER],
    });

    return from(created);

    // const msg = {
    //   from: 'hantsy@gmail.com', // Use the email address or domain you verified above
    //   subject: 'Welcome to Nestjs Sample',
    //   templateId: "d-cc6080999ac04a558d632acf2d5d0b7a",
    //   personalizations: [
    //     {
    //       to: data.email,
    //       dynamicTemplateData: { name: data.fullName + ' ' + data.lastName },
    //     }
    //   ]

    // };
    // return this.sendgridService.send(msg).pipe(
    //   catchError(err=>of(`sending email failed:${err}`)),
    //   tap(data => console.log(data)),
    //   mergeMap(data => from(created)),
    // );
  }

  findById(id: string, withPosts = false): Observable<User> {
    const userQuery = this.userModel.findOne({ _id: id });
    if (withPosts) {
      userQuery.populate('posts');
    }
    userQuery.exec().then((data) => {
      console.warn(data);
    });
    return from(userQuery.exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user:${id} was not found`)),
    );
  }

  update(id: string, data: UserDto): Observable<User> {
    return from(
      this.userModel.findOneAndUpdate({ _id: id }, { ...data }).exec(),
    ).pipe(
      throwIfEmpty(() => new NotFoundException(`user:${id} was not found`)),
    );
  }

  delete(id: string): Observable<User> {
    return from(this.userModel.findByIdAndDelete(id).exec()).pipe(
      throwIfEmpty(() => new NotFoundException(`uesr:${id} was not found`)),
    );
  }
}
