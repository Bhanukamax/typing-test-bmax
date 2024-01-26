import { Label, RangeSlider, TextInput } from 'flowbite-react';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { updateSetting, type SettingsType } from '../util/settings';

type Props = {
    onSave: () => void;
    settings: SettingsType;
};

export default function Settings({ onSave, settings }: Props) {
  const [wordCount, setWordCount] = useState<number>(settings.wordCount);
  const inputRef = useRef<HTMLInputElement>(null);

    const handleWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value;
        if (isNaN(Number(e?.target?.value))) return;
        setWordCount(Number(e?.target?.value) || wordCount);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSetting('wordCount', wordCount);
        onSave();
    };

  const handleClick = () => {
    inputRef.current?.select();
  }
    return (
        <div className="color-sub flex just">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="text-xl">Settings</h2>

                <Label htmlFor="wordCount" className="color-text">
                    Word count:
                </Label>
                <input
                  onClick={handleClick}
                    ref={inputRef}
                    className="color-main bg-bg border-0 pl-2"
                    id="wordCount"
                    min={1}
                    max={1000}
                    value={wordCount}
                    onChange={handleWordCountChange}
                />
                <RangeSlider
                    id="wordCount"
                    min={1}
                    max={50}
                    value={wordCount}
                    onChange={handleWordCountChange}
                />

                <div className="flex justify-center">
                    <button className="button mt-5 rounded-full" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
