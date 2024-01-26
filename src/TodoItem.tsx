import { FC } from 'react';

type Props = {
    name: string;
    id: string;
};

const TodoItem: FC<Props> = ({ name }) => {
    return <div>{name}</div>;
};

export default TodoItem;
