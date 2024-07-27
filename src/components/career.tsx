import { Box, Heading, Link, Text } from '@radix-ui/themes';
import {
    differenceInMonths,
    differenceInYears,
    format,
    formatDistance,
    formatDistanceStrict,
    formatISO
} from 'date-fns';

const content = [
    {
        title: "Software Engineer",
        company: "WorkOS",
        url: "https://workos.com",
        location: "Remote from Brazil",
        period: {start: "2022-07-01", end: null},
    },
    {
        title: "Senior Software Engineer",
        company: "Zapier",
        url: "https://zapier.com",
        location: "Remote from Brazil",
        period: {start: "2020-10-01", end: "2022-07-01"},
    },
    {
        title: "Senior Python Engineer",
        company: "LeafLink",
        url: "https://leaflink.com",
        location: "Remote from Brazil",
        period: {start: "2019-10-01", end: "2020-10-01"},
    },
    {
        title: "Analyst of Planning and Management in IT",
        company: "IBGE",
        url: "https://www.ibge.gov.br",
        location: "Rio de Janeiro, Brazil",
        period: {start: "2014-06-01", end: "2019-09-01"},
    },
    {
        title: "Full Stack Developer and Researcher",
        company: "TV Globo",
        url: "https://globo.com",
        location: "Rio de Janeiro, Brazil",
        period: {start: "2013-09-01", end: "2014-05-01"},
    },
    {
        title: "Business Analyst - Technology Advisory",
        company: "Deloitte",
        url: "https://www2.deloitte.com",
        location: "Rio de Janeiro, Brazil",
        period: {start: "2013-01-01", end: "2013-08-01"},
    },
    {
        title: "Web Developer",
        company: "Grupo Emídia",
        url: "https://grupoemidia.com",
        location: "Juiz de Fora, Brazil",
        period: {start: "2012-03-01", end: "2012-11-01"},
    },
    {
        title: "Web Developer",
        company: "Brasdev Devenvolvedores",
        url: null,
        location: "Juiz de Fora, Brazil",
        period: {start: "2010-01-01", end: "2010-12-01"},
    },
] as const;

const monthFormat = (date: string) => format(date, "MMM yyyy");
const distanceFormat = (start: string, end: string) => {
    const deltaYears = differenceInYears(end, start);
    const deltaMonths = differenceInMonths(end, start) % 12;

    const months = (() => {
        if (deltaMonths === 0) {
            return "";
        }

        if (deltaMonths === 1) {
            return "1 m";
        }

        return `${deltaMonths} m`;
    })();

    if (deltaYears === 0) {
        return months;
    }

    const years = (() => {
        if (deltaYears === 1) {
            return "1 yr";
        }

        return `${deltaYears} yrs`;
    })();

    if (months && deltaYears) {
        return `${years}, ${months}`;
    }

    return years;
};

const Carrer = () => {
    return (
        <div>
            {content.map((item, index) => (
                <Box key={index} mb="4">
                    <Heading as="h3" mb="2" size="5">{item.title}</Heading>
                    <Text as="p"><Link href={item.url ?? undefined}
                                       target="_blank">{item.company}</Link> - {item.location}</Text>
                    <Text
                        color={'gray'}
                        as="p">{monthFormat(item.period.start)} -&nbsp;
                        {item.period.end ? monthFormat(item.period.end) : "Current"}&nbsp;
                        ({distanceFormat(item.period.start, item.period.end ?? formatISO(new Date()))})
                    </Text>
                </Box>
            ))}
        </div>
    )
}

export default Carrer;