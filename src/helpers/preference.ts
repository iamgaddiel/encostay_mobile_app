import { Preferences } from '@capacitor/preferences';




type Data = {
    key: string
    value: string
}

export const setPreferenceData = async ({ key, value}: Data): Promise<void> => {
    return await Preferences.set({
        key,
        value
    });
};

export const getPreferenceData = async (key: string): Promise<string | null> => {
    const { value } = await Preferences.get({ key });
    return value
};

export const removePreferenceData = async (key: string): Promise<void> => {
    await Preferences.remove({ key: 'name' });
};