export const getEnvVar = (envVar: string | undefined | null) => {
	if (envVar === undefined || envVar == null) {
		throw "something went wrong";
	} else {
		return envVar;
	}
};
