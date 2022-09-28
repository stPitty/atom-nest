import { Connection } from 'mongoose';
import { Answer, AnswerSchema } from './answer.model';
import { IAttachment, IAttachmentSchema } from './attachment.model';
import {
  CounterParameters,
  CounterParametersSchema,
} from './counters-parameters.model';
import {
  ANSWER_MODEL,
  ATTACHMENT_MODEL,
  COUNTER_PARAMETERS_MODEL,
  DATABASE_CONNECTION,
  DICTATION_QUESTION_MODEL,
  FAQ_MODEL,
  MENU_MODEL,
  NEWS_MODEL,
  ORGANIZATION_TYPE_MODEL,
  PARTNER_MODEL,
  QUESTION_MODEL,
  QUESTION_OPTION_MODEL,
  SUBCATEGORY_MODEL,
  SUPPORTER_MODEL,
  USER_MODEL,
} from './database.constants';
import { DictationQuestionSchema } from './dictation-question.model';
import { Faq, FaqSchema } from './faq.model';
import { Menu, MenuSchema } from './menu.model';
import { News, NewsSchema } from './news.model';
import {
  OrganizationType,
  OrganizationTypeSchema,
} from './organization-type.model';
import { Partner, PartnerSchema } from './partner.model';
import { Question, QuestionSchema } from './question.model';
import { QuestionOption, QuestionOptionSchema } from './questionOption.model';
import { Subcategory, SubcategorySchema } from './subcategory.model';
import { SupporterSchema } from './supporter.model';
import { userModelFn } from './user.model';

export const databaseModelsProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => userModelFn(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: ANSWER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Answer>('Answer', AnswerSchema, 'answers'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: QUESTION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Question>('Question', QuestionSchema, 'questions'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: QUESTION_OPTION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<QuestionOption>(
        'QuestionOption',
        QuestionOptionSchema,
        'questionOptions',
      ),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: NEWS_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<News>('News', NewsSchema, 'news'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: FAQ_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Faq>('Faq', FaqSchema, 'faqs'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: PARTNER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Partner>('Partner', PartnerSchema, 'partners'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: COUNTER_PARAMETERS_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<CounterParameters>(
        'CounterParameters',
        CounterParametersSchema,
        'counterParameters',
      ),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: ATTACHMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<IAttachment>(
        'IAttachment',
        IAttachmentSchema,
        'attachments',
      ),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: MENU_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Menu>('Menu', MenuSchema, 'menus'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: SUBCATEGORY_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Subcategory>(
        'Subcategory',
        SubcategorySchema,
        'subcategories',
      ),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: ORGANIZATION_TYPE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<OrganizationType>(
        'OrganizationType',
        OrganizationTypeSchema,
        'organizationTypes',
      ),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: SUPPORTER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Partner>('Supporter', SupporterSchema, 'supporters'),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: DICTATION_QUESTION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model<Partner>(
        'DictationQuestions',
        DictationQuestionSchema,
        'dictationQuestions',
      ),
    inject: [DATABASE_CONNECTION],
  },
];
