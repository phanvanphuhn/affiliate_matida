import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, useWindowDimensions, ViewStyle} from 'react-native';
import RenderHtml, {
  CustomRendererProps,
  defaultSystemFonts,
  HTMLContentModel,
  HTMLElementModel,
  MixedStyleRecord,
  RenderHTMLProps,
  TChildrenRenderer,
  TBlock,
  TNodeChildrenRenderer,
} from 'react-native-render-html';

interface Props {
  html: string;
  padding: boolean;
  scrollEnabled: boolean;
  style?: ViewStyle;
  pointerEvents?: 'none' | 'auto' | 'box-none' | 'box-only';
}

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: 100,
  },
});

const customHTMLElementModels = (
  style: any,
  scrollEnabled: boolean,
  padding: boolean,
) => {
  return {
    template: HTMLElementModel.fromCustomModel({
      tagName: 'template',
      mixedUAStyles: {
        ...style,
        position: 'relative',
        padding: padding ? '0 20px 40px 20px' : '0',
        overflow: scrollEnabled ? 'scroll' : 'hidden',
      },
      contentModel: HTMLContentModel.block,
    }),
    scrollfade: HTMLElementModel.fromCustomModel({
      tagName: 'scrollfade',
      mixedUAStyles: {
        position: 'absolute',
        width: '100%',
        height: '220px',
        left: 0,
        bottom: 0,
        display: 'flex',
      },
      contentModel: HTMLContentModel.block,
    }),
  };
};

const renderers: RenderHTMLProps['renderers'] = {
  scrollfade: ({TDefaultRenderer, ...props}: CustomRendererProps<TBlock>) => {
    return (
      <TDefaultRenderer {...props}>
        <TNodeChildrenRenderer tnode={props.tnode} />
      </TDefaultRenderer>
    );
  },
};

const wrapHTMLInBody = (html: string) => {
  return `
      <body>
          <template>
            ${html}
            <scrollfade>test</scrollfade>
          </template>
          
      </body>
  `;
};

const Description: FunctionComponent<Props> = props => {
  const {width} = useWindowDimensions();
  const systemFonts = [...defaultSystemFonts, 'OpenSans-Regular'];

  return (
    <>
      <RenderHtml
        contentWidth={width}
        source={{
          html: wrapHTMLInBody(props.html),
        }}
        renderers={renderers}
        customHTMLElementModels={customHTMLElementModels(
          props.style,
          props.scrollEnabled,
          props.padding,
        )}
        systemFonts={systemFonts}
      />
    </>
  );
};

export default Description;
