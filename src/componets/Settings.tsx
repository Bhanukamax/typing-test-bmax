import { Label, RangeSlider, TextInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { loadSettings, updateSetting } from '../util/settings';


const settings = loadSettings();
export default function Settings() {
    const [wordCount, setWordCount] = useState<number>(settings.wordCount);

    const handleWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWordCount(Number(e?.target?.value) || wordCount);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSetting('wordCount', wordCount);
    };

    return (
        <div className="color-sub">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="text-xl">Settings</h2>

                <Label htmlFor="wordCount" className="color-text">
                    Word count
                </Label>
                <TextInput
                    id="wordCount"
                    type="number"
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

                <button className="button" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}
