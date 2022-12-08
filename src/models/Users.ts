import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
	@prop({ required: true })
	public userUUID: string;
	@prop({ required: true })
	public email: string;
	@prop({ required: true })
	public username: string;
	@prop({ default: [] })
	public fursonaUUIDs: string[];
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

export const UserModel = getModelForClass(User);