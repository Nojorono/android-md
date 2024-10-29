import config from "../../../config/config";

interface SigninData {
    email: string;
    password: string;
}

export const signin = async (data: SigninData): Promise<any> => {
    try {
        const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to sign in");
        }

        return await response.json();
    } catch (error) {
        console.error("Error signing up:", (error as Error).message);
        throw error as Error;
    }
};
