import React, { Suspense } from 'react';
import { Text as DreiText } from '@react-three/drei';

type TextProps = React.ComponentProps<typeof DreiText>;

export const SpatialText: React.FC<TextProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <DreiText font="/fonts/Consolas.ttf" {...props}>
        {props.children}
      </DreiText>
    </Suspense>
  );
};
