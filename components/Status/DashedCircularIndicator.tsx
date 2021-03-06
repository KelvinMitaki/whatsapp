import React from "react";
import PropTypes from "prop-types";
import { Path, Svg, Circle, Text } from "react-native-svg";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
/* ------------------------ CONSTANTS ------------------------  */
const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;

const Direction = {
  CLOCKSWISE: -1,
  ANTI_CLOCKWISE: 1
};

interface Props {
  maxValue?: number;
  selectedValue?: number;
  radius?: number;
  strokeWidth?: number;
  label?: JSX.Element;
  activeStrokeColor?: string;
  inactiveStrokeColor?: string;
  backgroundColor?: string;
  textColor?: number;
  labelFontSize?: number;
  valueFontSize?: number;
  withGradient?: boolean;
  anticlockwise?: boolean;
  initialAngularDisplacement?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DashedCircularIndicator: React.FC<Props> = React.memo(
  ({
    maxValue = MAX_VALUE,
    selectedValue = 0,
    radius = DEFAULT_RADIUS,
    strokeWidth = radius / 10,
    label = <></>,
    activeStrokeColor = "#05a168",
    inactiveStrokeColor = "#ddd",
    backgroundColor = "#fff",
    textColor = "#000",
    labelFontSize = Math.floor(radius / 3),
    valueFontSize = Math.floor(radius / 2.5),
    withGradient = false,
    anticlockwise = false,
    initialAngularDisplacement = 0,
    containerStyle
  }) => {
    // ----  PIE calculation funciton --------
    const generatePie = (value: number) => {
      const x = radius - Math.cos((2 * Math.PI) / (100 / value)) * radius;
      const y = radius + Math.sin((2 * Math.PI) / (100 / value)) * radius;
      const long = value <= 50 ? 0 : 1;
      const d = `M${radius},${radius} L${radius},${0}, A${radius},${radius} 0 ${long},1 ${y},${x} Z`;

      return d;
    };

    //----  PIE Area calculation  --------
    const calculatePieValue = (numberOfBars: number) => {
      const angle = 360 / numberOfBars;
      const pieValue = Math.floor(angle / 4);
      return pieValue < 1 ? 1 : Math.floor(angle / 4);
    };

    // ----  PIE render funciton --------
    const renderPie = (i: number) => {
      const DIRECTION = anticlockwise ? Direction.ANTI_CLOCKWISE : Direction.CLOCKSWISE;
      //Rotation Calculation
      const primaryRotationAngle = (maxValue - 1) * (360 / maxValue);
      const rotationAngle =
        DIRECTION * initialAngularDisplacement +
        -1 * DIRECTION * primaryRotationAngle +
        i * DIRECTION * primaryRotationAngle;
      const rotationTransformation = `rotate(${rotationAngle}, ${radius}, ${radius})`;

      const pieValue = calculatePieValue(maxValue);
      const dValue = generatePie(pieValue);

      const activeColor = withGradient
        ? shadeColor(activeStrokeColor, ((i + 1) * maxValue) / 50)
        : activeStrokeColor;

      const fillColor = i <= selectedValue ? activeColor : inactiveStrokeColor;

      return <Path key={i} d={dValue} fill={fillColor} transform={rotationTransformation} />;
    };

    // ----  Creates a circle by combining the Pie(s) --------
    const renderOuterCircle = () => {
      return [...Array(maxValue + 1)].map((e, i) => renderPie(i));
    };

    const labelView = (
      <Text
        fill={textColor}
        fontSize={labelFontSize}
        x={radius}
        y={radius + labelFontSize}
        textAnchor="middle"
      >
        {label}
      </Text>
    );

    const textValueY = !!label ? radius : radius + valueFontSize / 3;

    // --------  MAIN Render --------
    return (
      <View style={[styles.container, containerStyle]}>
        <Svg width={radius * 2} height={radius * 2}>
          {renderOuterCircle()}

          {/* This is the overlay circle */}
          <Circle r={radius - strokeWidth} cx={radius} cy={radius} fill={backgroundColor} />

          <Text
            fill={textColor}
            fontSize={valueFontSize}
            fontWeight="bold"
            x={radius}
            y={textValueY}
            textAnchor="middle"
          ></Text>
          <View
            style={{
              height: 65,
              width: 65,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {React.isValidElement(label) ? label : labelView}
          </View>
        </Svg>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { padding: 10 }
});

// ------------------------ UTILITY FUNCTION ------------------------

function shadeColor(color: string, percent: number) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(((R * (100 + percent)) / 100).toString());
  G = parseInt(((G * (100 + percent)) / 100).toString());
  B = parseInt(((B * (100 + percent)) / 100).toString());

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
