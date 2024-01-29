import { useState } from 'react';
import { updateSetting, type SettingsType } from '../util/settings';
import WordCuntInput from './word-count-input';
import { ToggleSwitch } from 'flowbite-react';

type Props = {
    onSave: (settings: SettingsType) => void;
    settings: SettingsType;
};

export default function Settings({ onSave, settings }: Props) {
    const [wordCount, setWordCount] = useState<number>(settings.wordCount);
    const [showErrorChars, setShowErrorChars] = useState<boolean>(
        settings.showErrorsChars
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ wordCount, showErrorsChars: showErrorChars });
    };

    return (
        <form className="form flex w-full items-center" onSubmit={handleSubmit}>
            <div className="color-sub flex flex-col w-full items-center">
                <h2 className="text-xl text-center">Settings</h2>

                <div className="flex flex-col gap-2 max-w-full w-60 ">
                    <WordCuntInput value={wordCount} onChange={setWordCount} />

                    <div className="flex justify-between">
                        <label className="label color-text">Show error characters</label>
                        <ToggleSwitch
                            name="showErrorChars"
                            color="main"
                            checked={showErrorChars}
                            onChange={setShowErrorChars}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="button mt-5 rounded-full" type="submit">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
