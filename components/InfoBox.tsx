import { TextStyle, View, ViewStyle, Text } from "react-native";

type InfoBoxProps = {
  title?: string;
  subtitle?: string;
  containerStyles?: ViewStyle;
  titleStyles?: TextStyle;
};

export const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: InfoBoxProps) => {
  return <View style={containerStyles}>
    <Text
    style={{
      color: 'white',
      textAlign: 'center',
      ...titleStyles
    }}
    >{title}</Text>
    <Text
    style={{
      fontSize: 12,
      color: '#CDCDE0',
      textAlign: 'center',
    }}
    >{subtitle}</Text>
  </View>;
};
