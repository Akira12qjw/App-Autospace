import React from "react";
import { View, Text } from "react-native";
import { FormError } from "./FormError";

export type HtmlLabelProps = {
  children: React.ReactNode;
  title: string;
  error?: string;
  optional?: boolean;
  className?: string;
};

export const HtmlLabel = React.forwardRef<View, HtmlLabelProps>(
  ({ children, title, optional, error, className }, ref) => {
    return (
      <View ref={ref} style={{ marginBottom: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontWeight: "600", textTransform: "capitalize" }}>
            {title}
          </Text>
          {optional && (
            <Text style={{ fontSize: 12, color: "#666" }}>(optional)</Text>
          )}
        </View>
        {children}
        {error && <FormError error={error} />}
      </View>
    );
  }
);

HtmlLabel.displayName = "HtmlLabel";
