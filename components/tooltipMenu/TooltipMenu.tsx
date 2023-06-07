import React, { createRef, ReactNode, useEffect, useMemo, useState } from 'react';
import {
    View,
    Modal,
    Animated,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    LayoutRectangle,
    useWindowDimensions,
    LayoutChangeEvent,
    TouchableOpacityProps,
} from 'react-native';
import { TooltipMenuItem } from './TooltipMenuItem';

type TrianglePosition = 'left' | 'center' | 'right';
type Props = {
    children: ReactNode;
    items: {
        label: string | (() => ReactNode);
        onPress: () => void;
        testID?: string;
    }[];
    style?: TouchableOpacityProps['style'];
    overlayStyle?: ViewStyle;
    labelContainerStyle?: ViewStyle;
    modalButtonStyle?: ViewStyle;
    labelStyle?: ViewStyle;
    onRequestClose?: () => void;
    trianglePosition?: TrianglePosition;
};

const TooltipMenu = ({
    children,
    items,
    style,
    overlayStyle,
    labelContainerStyle,
    labelStyle,
    modalButtonStyle,
    onRequestClose,
    trianglePosition,
}: Props) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const buttonRef = createRef<View>();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<LayoutRectangle>();
    const opacity = useMemo(() => new Animated.Value(0), []);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const openModal = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(toggleModal);
    };

    const hideModal = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(toggleModal);
    };

    const handleClick = (onClickItem: Props['items'][0]['onPress']) => {
        const method = isModalOpen ? hideModal : openModal;
        method();

        const waitForModalClose = () => setTimeout(() => {
            onClickItem()
        }, 350)

        waitForModalClose();
    };

    const calculatePosition = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        if (!position && buttonRef.current) {
            buttonRef.current.measureInWindow((x, y) => {
                setPosition({
                    x,
                    y,
                    width,
                    height,
                });
            });
        }
    };

    return (
        <View style={style} ref={buttonRef} collapsable={false}>
            <TouchableOpacity
                onPress={openModal}
                onLayout={(event) => calculatePosition(event)}
            >
                {children}
            </TouchableOpacity>
            <Modal visible={isModalOpen} transparent onRequestClose={onRequestClose}>
                <View style={[styles.overlay, overlayStyle]} />
                <TouchableOpacity
                    activeOpacity={1}
                    style={[{ flex: 1 }, modalButtonStyle]}
                    onPress={hideModal}
                >
                    <View
                        style={[
                            styles.component,
                            position && {
                                top: position.y,
                                left: position.x,
                            },
                        ]}
                    >
                        <TouchableOpacity onPress={isModalOpen ? hideModal : openModal}>
                            {children}
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={[
                            { minWidth: position?.width },
                            styles.tooltipContainer,
                            position && {
                                top: position.y + position.height + 9,
                                right: windowWidth - position.x - 20,
                            },
                            { opacity },
                        ]}
                    >
                        {items.map((item, index) => {
                            const classes = [];

                            if (labelContainerStyle) {
                                classes.push(labelContainerStyle);
                            }

                            if (index !== items.length - 1) {
                                classes.push(styles.tooltipMargin);
                            }

                            return (
                                <TooltipMenuItem
                                    key={index}
                                    label={item.label}
                                    onPress={() => handleClick(item.onPress)}
                                    containerStyle={classes}
                                    labelStyle={labelStyle}
                                    testID={item.testID}
                                />
                            );
                        })}
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.triangle,
                            { opacity },
                            position && {
                                top: position.y + (position.height),
                            },
                            position && {
                                left: position.x + position.width - 30,
                            },
                        ]}
                    />
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

TooltipMenu.defaultProps = {
    widthType: 'auto',
    onRequestClose: () => { },
    trianglePosition: 'center',
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tooltipMargin: {
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
    },
    component: {
        position: 'absolute',
    },
    tooltipContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
    },
    triangle: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        borderLeftColor: 'transparent',
    },
});

export default TooltipMenu