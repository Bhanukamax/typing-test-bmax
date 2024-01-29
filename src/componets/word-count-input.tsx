import { Label, RangeSlider } from 'flowbite-react';
import { ChangeEvent, useRef } from 'react';

type Props = {
    value: number;
    onChange: (wordCount: number) => void;
};

export default function WordCuntInput({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e?.target?.value;
        if (isNaN(Number(e?.target?.value))) return;
        onChange(Number(e?.target?.value) || value);
    };

    const handleClick = () => {
        inputRef.current?.select();
    };

    return (
      <>
          <div className="flex justify-between">
            <Label htmlFor="wordCount" className="color-text grow shrink-0">
                Word count:
            </Label>
            <input
                onClick={handleClick}
                ref={inputRef}
                className="color-main bg-bg pl-2 shrink grow-0 w-10"
                id="wordCount"
                min={1}
                max={1000}
                value={value}
                onChange={handleWordCountChange}
            />
          </div>
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
