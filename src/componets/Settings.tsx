import { useState } from 'react';
import { updateSetting, type SettingsType } from '../util/settings';
import WordCuntInput from './word-count-input';

type Props = {
    onSave: () => void;
    settings: SettingsType;
};

export default function Settings({ onSave, settings }: Props) {
    const [wordCount, setWordCount] = useState<number>(settings.wordCount);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave();
    };

    return (
        <div className="color-sub flex just">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="text-xl text-center">Settings</h2>

                <WordCuntInput value={wordCount} onChange={setWordCount} />
                <div className="flex justify-center">
                    <button className="button mt-5 rounded-full" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
