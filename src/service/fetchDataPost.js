import fetcho from "./fetcho";

const fetchDataPost = async ({ area, object, method, params, setLoading }) => {
  try {
    const body = {
      area,
      object,
      method,
      params,
    };

    // console.log(body)
    setLoading(true)
    const fetchoResponse = await fetcho({
      url: "/toProcess",
      body,
      method: "POST",
    });
    setLoading(false)

    return fetchoResponse;
  } catch (error) {
    console.log(
      `Hubo un error en el handleFetcho del useLoadData, error: ${error.message}`
    );
    setLoading(false)

    return { error: error.message };
  }
};

export default fetchDataPost;
