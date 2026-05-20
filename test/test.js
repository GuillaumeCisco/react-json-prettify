import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import JSONPretty from '../src';
import atomOneLight from '../src/themes/atomOneLight';

const json = {
    name: 'John Doe',
    type: 'foo',
    age: 20,
    admin: true,
    member: null,
    permissions: ['read', 'write', 'edit'],
    deep: [
        {
            a: {
                b: {
                    c: null,
                    d: ['e', 'f', [1, null]],
                },
            },
        },
    ],
};

const customTheme = {
    ...atomOneLight,
    valueQuotes: 'rgb(140, 153, 165)',
    value: {
        ...atomOneLight.value,
        string: (value) => value === 'foo' ? 'red': 'green',
    },
};


describe('JSONPretty', function () {
    it('should create component with pre as first tag', function () {
        const {container} = render(<JSONPretty/>);
        expect(container.querySelector('pre')).toBeInTheDocument();
    });

    it('should have a default padding to 2', function () {
        const {rerender} = render(<JSONPretty/>);
        rerender(<JSONPretty/>);

        expect(JSONPretty.defaultProps.padding).toBe(2);
    });

    it('should have a padding to 4', function () {
        const {container} = render(<JSONPretty padding={4}/>);
        const pre = container.querySelector('pre');
        expect(pre).toBeInTheDocument();
    });

    it('should correctly render a complex json', function () {
        const {container} = render(<JSONPretty json={json}/>);

        expect(container).toHaveTextContent('John Doe');
        expect(container).toHaveTextContent('permissions');
    });

    it('should have right colors with function', function () {
        const {container} = render(<JSONPretty json={json} theme={customTheme}/>);
        expect(container.innerHTML).toContain('color: red;');
        expect(container.innerHTML).toContain('color: green;');
    });
});
