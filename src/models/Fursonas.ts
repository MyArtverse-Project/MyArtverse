import { getModelForClass, prop } from "@typegoose/typegoose";

class Fursonas {
	@prop({ required: true })
	public fursonaUUID: string;
	@prop({ required: true })
	public name: string;
	@prop({ required: true, maxlength: 100 })
	public bio: string;
	@prop({ required: true, maxlength: 1500 })
	public info: string;
	@prop({ default: 0 })
	public likes: number;
	@prop({ default: [] })
	public artworksCDNLinks: string[];
	@prop({ default: false })
	public verified: boolean;
}

export const FursonasModel = getModelForClass(Fursonas);
