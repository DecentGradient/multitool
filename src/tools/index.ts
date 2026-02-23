import { JsonFormatterModule } from './JsonFormatter';
import { XmlFormatterModule } from './XmlFormatter';
import { Base64EncoderModule } from './Base64Encoder';
import { UrlEncoderModule } from './UrlEncoder';
import { HtmlEntitiesEncoderModule } from './HtmlEntitiesEncoder';
import { JwtDecoderModule } from './JwtDecoder';
import { UuidGeneratorModule } from './UuidGenerator';
import { HashGeneratorModule } from './HashGenerator';
import { PasswordGeneratorModule } from './PasswordGenerator';

export const allModules = [
  JsonFormatterModule,
  XmlFormatterModule,
  Base64EncoderModule,
  UrlEncoderModule,
  HtmlEntitiesEncoderModule,
  JwtDecoderModule,
  UuidGeneratorModule,
  HashGeneratorModule,
  PasswordGeneratorModule,
];