import { Label, RangeSlider } from 'flowbite-react';
import { useRef } from 'react';

type Props = {
    value: number;
    onChange: (wordCount: number) => void;
};

export default function WordCuntInput({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value;
        if (isNaN(Number(e?.target?.value))) return;
        onChange(Number(e?.target?.value) || value);
    };

    const handleClick = () => {
        inputRef.current?.select();
    };

    return (
        <>
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
                value={value}
                onChange={handleWordCountChange}
            />
            <RangeSlider
                className="word-count-slider"
                id="wordCount"
                min={1}
                max={50}
                value={value}
                onChange={handleWordCountChange}
            />
        </>
    );
}
