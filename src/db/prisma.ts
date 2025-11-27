import { PrismaClient } from "@prisma/client/extension"

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined
}

// database connection with query logging
export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
	log: ["query", "info", "warn", "error"],
})

// reconnection logic
if(process.env.NODE_ENV !== "production"){
	globalForPrisma.prisma = prisma
}

// export default prisma1
