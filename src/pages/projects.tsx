import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import {
	Grid,
	GridItem,
	Center,
	useBreakpointValue,
	Text,
	Flex,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import Layout from "./_layout";
import { pageAtom, projectsAtom } from "../lib/jotai";
import { Card } from "@/components/card";
import { CustomSet } from "@/utils/CustomSet";
import { HorizontalCard } from "@/components/horizontalCard";

const inter = Inter({ subsets: ["latin"] });

const translate = {
	address: "Localidade",
	potency: "Potência instalada",
	estimation: "Estimativa",
};

export default function Projects() {
	const [projects, setProjects] = useAtom(projectsAtom);
	const [page, setPage] = useAtom(pageAtom);
	const [nextPage, setNextPage] = useState({ page: page + 1 });
	const [prevPage, setPrevPage] = useState({});
	const [canFetch, setCanFetch] = useState(true);
	const breakpointValue = useBreakpointValue({
		base: "small",
		sm: "medium",
		md: "large",
		lg: "xl",
		xl: "xxl",
	});

	const fetchData = async (pageNumber: number) => {
		try {
			if (nextPage == undefined) {
				return;
			}
			const response = await fetch(`/api/projects?page=${pageNumber}`);
			const result = await response.json();
			setNextPage(result.next);
			setPrevPage(result.previous);
			return result.data;
		} catch (error) {
			console.error("Error fetching data:", error);
			setCanFetch(false);
			return [];
		}
	};

	const loadMoreData = async () => {
		const nextPage = page + 1;
		const newData = await fetchData(nextPage);
		if (newData?.length > 0) {
			const set = new CustomSet(projects);
			newData.forEach((element: any) => {
				set.add(element, "meta-displayName");
			});
			setProjects(set);
			setPage(nextPage);
		}
	};

	useEffect(() => {
		const fetchDataOnMount = async () => {
			const initialData = await fetchData(1);
			if (initialData?.length > 0) {
				const set = new CustomSet(projects);
				initialData.forEach((element: any) => {
					set.add(element, "meta-displayName");
				});
				setProjects(set);
			}
		};

		fetchDataOnMount();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight * 0.97) {
				if (canFetch) {
					loadMoreData();
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [page]);

	useEffect(() => {
		console.log("breakpointValue", breakpointValue);
	}, [breakpointValue]);

	return (
		<>
			<Layout>
				{/* <Text>{projects.values.length} projetos</Text> */}
				<Flex
					backgroundImage={"url(images/banners/DJI_0028.jpg)"}
					h={"20vh"}
					minH={"300px"}
					backgroundRepeat={"no-repeat"}
					backgroundPosition={"20% 20%"}
					backgroundSize={"cover"}
				>
					{/* <Image src="images/banners/DJI_0028.jpg" maxH={'20vh'} /> */}
					<Flex
						// align={"end"}
						align={useBreakpointValue({
							base: "center",
							md: "end",
							lg: "end",
							xl: "end",
						})}
						w={useBreakpointValue({
							base: "100%",
						})}
						// background={'blue'}
						// className={`bule`}
					>
						<Flex
							color={"#fff"}
							fontWeight={"bold"}
							fontSize={useBreakpointValue({
								base: "3xl",
								md: "4xl",
								lg: "4xl",
								xl: "4xl",
							})}
							background={"#0000008a"}
							// className={`black`}
							h={"fit-content"}
							paddingBlock={useBreakpointValue({
								base: "2rem",
								md: "1rem",
								lg: "1rem",
								xl: "1rem",
							})}
							paddingInline={useBreakpointValue({
								base: "0",
								md: "5rem 3rem",
								lg: "5rem 3rem",
								xl: "5rem 3rem",
							})}
							w={useBreakpointValue({
								base: "100%",
								md: "initial",
								lg: "initial",
								xl: "initial",
							})}
							justify={"center"}
						>
							<Text align={"center"} m={0}>
								PROJETOS REALIZADOS
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex background={"sun-light.blue"} h={"20px"}>
					{/* faixa azul */}
				</Flex>
				<Center>
					<Grid
						templateColumns={useBreakpointValue({
							base: "repeat(1, 1fr)",
							md: "repeat(1, 1fr)",
							lg: "repeat(1, 1fr)",
							xl: "repeat(2, 1fr)",
						})}
						gap={useBreakpointValue({
							base: 2,
							md: 6,
							lg: 10,
						})}
						marginBlock={5}
					>
						{projects.values.map((prj, index) => {
							return (
								<GridItem key={index}>
									{/* <Card project={prj}/> */}
									{/* <HorizontalCard project={prj}/> */}
									{breakpointValue == "small" && (
										<Card project={prj} />
									)}
									{breakpointValue == "medium" && (
										<HorizontalCard project={prj} />
									)}
									{breakpointValue == "large" && (
										<HorizontalCard project={prj} />
									)}
									{breakpointValue == "xl" && (
										<HorizontalCard project={prj} />
									)}
									{breakpointValue == "xxl" && (
										<Card project={prj} />
									)}
								</GridItem>
							);
						})}
					</Grid>
				</Center>
			</Layout>
		</>
	);
}
