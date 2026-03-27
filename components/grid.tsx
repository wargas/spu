'use client'
import { AllCommunityModule, themeQuartz } from "ag-grid-community";
import { AgGridProvider, AgGridReact, AgGridReactProps } from "ag-grid-react";

const modules = [AllCommunityModule];


type Props = AgGridReactProps<any>

export const myTheme = themeQuartz
    .withParams({
        borderColor: "#181D1F4A",
        fontFamily: {
            googleFont: "Inter"
        },
        fontSize: 13,
        headerRowBorder: true,
        rowBorder: true,
        wrapperBorder: false
    });

export function Grid(props: Props) {
    return <AgGridProvider modules={modules}>
        <AgGridReact theme={myTheme} {...props} />
    </AgGridProvider>
}