import bcrypt from "bcrypt";

const compare = (password: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};

export default {
	compare,
};
