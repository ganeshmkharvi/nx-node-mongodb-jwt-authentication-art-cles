import * as Article from "../model/article";
import * as constants from "../utility/constants";

export async function addArticle(req, res) {
    try {
        // Get user input
        const { title, slug, publishedAt } = req.body;

        // Validate user input
        if (!(title && slug)) {
            return res.status(constants.statusCode400).send({ message: constants.inValidInput });
        }

        // Create article in our database
        const article = await Article.create({
            title,
            slug,
            publishedAt
        });

        // return new article
        return res.status(constants.statusCode201).send(article);
    } catch (err) {
        console.log(err);
        return res.status(constants.statusCode500).send(err);
    }
}

export async function getArticle(req, res) {
    const article = await Article.findById(req.params.id);
    return res.status(constants.statusCode200).send({ message: article });
}

export async function deleteArticle(req, res): Promise<string> {
   return  await Article.findByIdAndDelete(req.params.id);
   // return res.status(constants.statusCode201).send({ message: constants.noContent });
}
