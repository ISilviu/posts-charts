import React from "react";
import QueryStateHandler from "./QueryStateHandler";
import { render, screen } from "@testing-library/react";

describe('QueryStateHandler', () => {

    const loadingText = 'Loading...';
    const childrenText = 'Children';
    const errorText = 'There was an error';

    test('Loading state', () => {
        render(
            <QueryStateHandler
                loading
                loadingComponent={<p>{loadingText}</p>}
            >
                <p>{childrenText}</p>
            </QueryStateHandler>
        );

        expect(screen.getByText(loadingText)).toBeInTheDocument();
        expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
    });

    test('Error state has precedence over loading state', () => {
        render(
            <QueryStateHandler
                loading
                loadingComponent={<p>{loadingText}</p>}
                error={{}}
                errorComponent={<p>{errorText}</p>}
            >
                <p>{childrenText}</p>
            </QueryStateHandler>
        );

        expect(screen.getByText(errorText)).toBeInTheDocument();
        expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
    });

    test('Renders children', () => {
        render(
            <QueryStateHandler
                loading={false}
                error={null}
                loadingComponent={<p>{loadingText}</p>}
                errorComponent={<p>{errorText}</p>}
            >
                <p>{childrenText}</p>
            </QueryStateHandler>
        );

        expect(screen.getByText(childrenText)).toBeInTheDocument();
        expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
        expect(screen.queryByText(errorText)).not.toBeInTheDocument();
    });
});