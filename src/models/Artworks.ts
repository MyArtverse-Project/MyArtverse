import { getModelForClass, prop } from "@typegoose/typegoose";

class Artworks {
  @prop({ required: true })
  public artwordUID: string;
  @prop({ required: true })
  public fursonaOwnerUUID: string;
  @prop({ required: true })
  public userOwnerUUID: string;
  @prop({ required: true })
  public artworkCDNLink: string;
  @prop({ default: 0 })
  public likes: string;
  @prop({ required: true })
  public artist: {
    name: string;
    socials: {
      twitter: string;
      furAffinity: string;
      telegram: string;
      discord: string;
    };
  };
  @prop({ default: false })
  public nsfw: boolean;
  @prop({
    default: {
      discordUserID: null,
      furAffinityLink: null,
      twitterLink: null,
      telegramLink: null,
    },
  })
  public social: {
    discordUserID: string;
    furAffinityLink: string;
    twitterLink: string;
    telegramLink: string;
  };
}

export const ArtworkModel = getModelForClass(Artworks);
