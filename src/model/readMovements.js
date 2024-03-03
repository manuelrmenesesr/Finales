export default async (prisma, where) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await prisma.movement.findMany({
        select: {
          id: true,
          concept: true,
          amount: true,
          date: true,
          Account: {
            select: {
              name: true,
              entity: true
            }
          },
          categoriesOnMovements: {
            select: {
              id: true,
              amount: true,
              Category: {
                select: {
                  category: true,
                  subcategory: true
                }
              },
              disbursementTransactions: {
                select: {
                  id: true,
                  remaining: true,
                  RepaymentMovements: {
                    select: {
                      id: true,
                      amount: true,
                      Category: {
                        select: {
                          category: true,
                          subcategory: true
                        }
                      },
                      Movements: {
                        select: {
                          id: true,
                          concept: true,
                          amount: true,
                          date: true,
                          Account: {
                            select: {
                              name: true,
                              entity: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              repaymentTransactions: {
                select: {
                  id: true,
                  remaining: true,
                  DisbursementMovements: {
                    select: {
                      id: true,
                      amount: true,
                      Category: {
                        select: {
                          category: true,
                          subcategory: true
                        }
                      },
                      Movements: {
                        select: {
                          id: true,
                          concept: true,
                          amount: true,
                          date: true,
                          Account: {
                            select: {
                              name: true,
                              entity: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        where: where,
        orderBy: {
          date: 'asc'
        }
      }));
    }
    catch (error) { reject(error); }
  });
}