import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../app/store";
import theme from "../styles/theme";

const render = (ui: ReactElement, renderOptions?: RenderOptions) => {
	const Wrapper: React.FC = ({ children }: { children?: React.ReactNode }) => (
		<Provider store={store}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</Provider>
	);
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
