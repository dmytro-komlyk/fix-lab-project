import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PREFIX } from '@app/constants/routes.constants';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_VERSION
} from '@app/constants/swagger.constants';

export const SwaggerHelper = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document, {
    customSiteTitle: `${SWAGGER_TITLE} ${SWAGGER_VERSION} - ${SWAGGER_DESCRIPTION}`
  });
};
