import * as React from 'react';
import Editor from '.';
import { render } from  '@testing-library/react';

describe('components/Editor', () => {
    it('renders without crashing', () => {
        const { container, debug } = render(<Editor />);

        debug();

        expect(container).not.toBeNull();
    });
});