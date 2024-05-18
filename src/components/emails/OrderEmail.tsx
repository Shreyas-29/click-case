import { ShippingAddress } from "@prisma/client";
import { Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text } from "@react-email/components";

const OrderEmail = ({ shippingAddress, orderId, orderDate }: { shippingAddress: ShippingAddress, orderId: string, orderDate: string }) => {

    const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://clickcase.vercel.app";

    return (
        <Html>
            <Head>
                <Preview>
                    Your order summary and estimated delivery date
                </Preview>
                <Body style={main}>
                    <Container style={container}>
                        <Section style={message}>
                            <Img
                                src={`${baseUrl}/snake-3.png`}
                                width="65"
                                height="73"
                                alt="delivery snake"
                                style={{ margin: "auto" }}
                            />
                            <Heading style={global.heading}>
                                Thank you for your order!
                            </Heading>
                            <Text style={global.text}>
                                We're preparing everything for you. You will receive a confirmation email once your order has been shipped. It should arrive within 2-3 business days.
                            </Text>
                            <Text style={{ ...global.text, marginTop: 24 }}>
                                If you have any questions, please contact us with your order number and we will be happy to help.
                            </Text>
                        </Section>
                        <Hr style={global.hr} />
                        <Section style={global.defaultPadding}>
                            <Text style={addressTitle}>
                                Shipping to: {shippingAddress.name}
                            </Text>
                            <Text style={{ ...global.text, fontSize: 14 }}>
                                {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                            </Text>
                        </Section>
                        <Hr style={global.hr} />
                        <Section style={global.defaultPadding}>
                            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
                                <Column style={{ width: 170 }}>
                                    <Text style={global.paragraphWithBold}>
                                        Order number
                                    </Text>
                                    <Text style={track.number}>
                                        {orderId}
                                    </Text>
                                </Column>
                                <Column style={{ marginLeft: 20 }}>
                                    <Text style={global.paragraphWithBold}>
                                        Order date
                                    </Text>
                                    <Text style={track.number}>
                                        {orderDate}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Hr style={global.hr} />

                        <Section style={paddingY}>
                            <Row>
                                <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                                    Please contact us if you have any questions about your order. (If you reply to this email, it will go to a mailbox that is not monitored.)
                                </Text>
                            </Row>
                            <Row>
                                <Text style={footer.text}>
                                    &copy; ClickCase, Inc. All rights reserved.
                                </Text>
                            </Row>
                        </Section>

                    </Container>
                </Body>
            </Head>
        </Html>
    )
};

export default OrderEmail;

const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
}

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
}

const paragraph = {
    margin: '0',
    lineHeight: '2',
}

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    } as React.CSSProperties,
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
}

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: '10px auto',
    width: '600px',
    maxWidth: '100%',
    border: '1px solid #E5E5E5',
}

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
}

const message = {
    padding: '40px 74px',
    textAlign: 'center',
} as React.CSSProperties

const addressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
}

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    } as React.CSSProperties,
}