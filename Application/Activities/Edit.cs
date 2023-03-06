using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id); //依照Id從資料庫取得該筆Activity內容

                //更新activity的Title資料
                //activity.Title = request.Activity.Title ?? activity.Title;  //??不指定合併運算符

                //自行一一對應屬性太過麻煩,所以用AutoMapper框架處理
                _mapper.Map(request.Activity,activity);


                await _context.SaveChangesAsync(); //將資料寫回資料庫

                return Unit.Value;
            }
        }
    }

    
}