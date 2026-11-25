import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

          // Checking if the token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied"
            })
        }

        // getting the exact token from the header
        const token = authHeader.split(" ")[1]

        // verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // attach decoded information to request
        req.user = decoded

        next()


    } catch (error) {
        return res.status(401).json({
        message: error.message
        })
    }
}

export default authMiddleware