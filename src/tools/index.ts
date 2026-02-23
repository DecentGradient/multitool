import { JsonFormatterModule } from './JsonFormatter';
import { XmlFormatterModule } from './XmlFormatter';
import { Base64EncoderModule } from './Base64Encoder';
import { UrlEncoderModule } from './UrlEncoder';
import { HtmlEntitiesEncoderModule } from './HtmlEntitiesEncoder';
import { JwtDecoderModule } from './JwtDecoder';

export const allModules = [
  JsonFormatterModule,
  XmlFormatterModule,
  Base64EncoderModule,
  UrlEncoderModule,
  HtmlEntitiesEncoderModule,
  JwtDecoderModule,
];