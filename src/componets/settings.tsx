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
    const [autoNext, setAutoNext] = useState<boolean>(
        Boolean(settings.autoNext)
    );
    const [showErrorChars, setShowErrorChars] = useState<boolean>(
        Boolean(settings.showErrorChars)
    );
    const [showInput, setShowInput] = useState<boolean>(
        Boolean(settings.showInput)
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ wordCount, showInput, showErrorChars, autoNext });
    };

    return (
        <form className="form flex w-full items-center" onSubmit={handleSubmit}>
            <div className="color-sub flex flex-col w-full items-center">
                <h2 className="text-xl text-center">Settings</h2>

                <div className="flex flex-col gap-2 max-w-full w-60 ">
                    <WordCuntInput value={wordCount} onChange={setWordCount} />
                    <BoolSetting value={showErrorChars} setValue={setShowErrorChars} title='Show error characters' />
                    <BoolSetting value={showInput} setValue={setShowInput} title='Show input field' />
                    <BoolSetting value={autoNext} setValue={setAutoNext} title='Auto next' />
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

function BoolSetting({
    value,
    setValue,
    title,
}: {
    value: boolean;
    setValue: (value: boolean) => void;
    title: string;
}) {
    return (
        <div className="flex justify-between">
            <label className="label color-text">{title}</label>
            <ToggleSwitch
                name="showInput"
                color="main"
                checked={value}
                onChange={setValue}
            />
        </div>
    );
}
